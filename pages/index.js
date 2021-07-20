import { useState, useEffect } from 'react';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';
import { AlurakutMenu, OrkutNostalgicIconSet, AlurakutProfileSidebarMenuDefault } from '../src/lib/AlurakutCommons';

function ProfileSidebar(props) {
  return (
    <Box as="aside">
          <img src={`https://github.com/${props.githubUser}.png`} style={{ borderRadius: '8px' }}/>
          <hr />
          <p>
            <a className="boxLink" href={`https://github.com/${props.githubUser}`}>
              @{props.githubUser}
            </a>
          </p>
          <hr />
          <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

function ProfileRelationsBox(props) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {props.title} ({props.items.length})
      </h2>
      <ul>
        {/* {following.map((followed) => {
          return (
            <li key={followed}>
              <a href={`/users/${followed}`} key={followed}>
                <img src={`https://github.com/${followed}.png`}/>
                <span>{followed}</span>
              </a>
            </li>
          )
        })} */}
      </ul>
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home() {
  const [following, setFollowing] = useState([]);
  const [communities, setCommunities] = useState([]);
  const randomUser = 'maranacaon';
  const favPeople = [
    'juunegreiros', 
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho',
  ]
  
  const token = ''

  useEffect(() => {
    fetch('https://api.github.com/users/maranacaon/following')
    .then(function (serverResponse) {
      return serverResponse.json();
    })
    .then( function (completeResponse) {
      setFollowing(completeResponse)
    })

    fetch(
      'https://graphql.datocms.com/', 
      {
        method: 'POST',
        headers: {
          'Authorization': 'e45b65c85ef83f75d922529d60262d',
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({"query": `query {
          allCommunities {
            id
            title
            imageUrl
            creatorSlug
          }
        }`})
      })
      .then((res) => res.json())
      .then((res) => {
        const datoCommunities = res.data.allCommunities
        setCommunities(datoCommunities)
      })
      .catch((error) => {
        console.log(error);
      })
  }, [])


  function handleCreateCommunity(e) {
    e.preventDefault();
    const dataForm = new FormData(e.target)

    const community = {
      title: dataForm.get('title'),
      imageUrl: dataForm.get('image'),
      creatorSlug: randomUser,
    }

    fetch('/api/communities', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(community)
    })
    .then(async (response) => {
      const data = await response.json();
      console.log(data.record);
      const community = data.record;
      const newCommuties = [...communities, community]
      setCommunities(newCommuties)
    })
  }

  return (
    <>
      <AlurakutMenu />

      <MainGrid>

        <div className="profileArea" style={{gridArea: 'profileArea'}}>
          <ProfileSidebar githubUser={randomUser} />
        </div>

        <div className="welcomeArea" style={{gridArea: 'welcomeArea'}}>
          <Box>
            <h1 className="title">
              Bem-vindo(a)
            </h1>

            <OrkutNostalgicIconSet />
          </Box>
          <Box>
            <h2 className="subTitle">
              Crie a sua comunidade
            </h2>
            <form onSubmit={handleCreateCommunity}>
              <div>
                <input 
                  placeholder="Qual é o nome da sua comunidade?" 
                  name="title" 
                  aria-label="Qual é o nome da sua comunidade?"
                  type="text" 
                />
              </div>
              <div>
                <input 
                  placeholder="Coloque uma URL para a capa da comunidade" 
                  name="image" 
                  aria-label="Coloque uma URL para a capa da comunidade"
                />
              </div>
              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>

        <div className="profileRelationsArea" style={{gridArea: 'profileRelationsArea'}}>
          <ProfileRelationsBox title="Seguindo" items={following}/>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({favPeople.length})
            </h2>
            <ul>
              {favPeople.map((favPerson) => {
                return (
                  <li key={favPerson}>
                    <a href={`/users/${favPerson}`} key={favPerson}>
                      <img src={`https://github.com/${favPerson}.png`}/>
                      <span>{favPerson}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
              <h2 className="smallTitle">
                Comunidades ({communities.length})
              </h2>
              <ul>
                {communities.map((community) => {
                  return (
                    <li key={community.id}>
                      <a href={`/comunidades/${community.id}`} key={community.id}>
                        <img src={community.imageUrl}/>
                        <span>{community.title}</span>
                      </a>
                    </li>
                  )
                })}
              </ul>
            </ProfileRelationsBoxWrapper>
        </div>

      </MainGrid>
    </>
  )
}
