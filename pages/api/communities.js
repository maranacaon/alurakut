import { SiteClient } from 'datocms-client';

export default async function requestReceiver(request, response) {
    
    if(request.method === 'POST') {
        const TOKEN = '211cbb3fae5fd07bcda7a49e082b31';
        const client = new SiteClient(TOKEN);

        const record = await client.items.create({
            itemType: "977060",
            ...request.body,
            // title: "Comunidade de teste",
            // imageUrl: "https://github.com/maranacaon.png",
            // creatorSlug:"maranacaon",
        })
    
        console.log(record);
    
        response.json({
            dados: 'Algum dado qualquer',
            record: record,
        })
        return;
    }

    response.status(404).json({
        message: 'Ainda não temos nada no GET, mas no POST tem!'
    })
}