import { useState } from 'react';
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
export default function Home() {
  const githubUser = 'maranacaon'
  const favPeople = [
    'juunegreiros', 
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho',
  ]
  const [communities, setCommunities] = useState([{
    id: new Date().toISOString(), 
    title: 'Amo meu gato',
    image: 'https://i.pinimg.com/564x/2d/86/d2/2d86d23546e43a97cf1ca307ef42a8a9.jpg',
  }])

  function handleCreateCommunity(e) {
    e.preventDefault();
    const dataForm = new FormData(e.target)

    const community = {
      id: new Date().toISOString(),
      title: dataForm.get('title'),
      image: dataForm.get('image'),
    }

    const newCommuties = [...communities, community]
    setCommunities(newCommuties)
    console.log(communities)
  }

  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{gridArea: 'profileArea'}}>
          <ProfileSidebar githubUser={githubUser} />
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
                      <a href={`/users/${community.title}`} key={community.title}>
                        <img src={community.image}/>
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
