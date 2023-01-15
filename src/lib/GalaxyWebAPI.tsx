export default class GalaxyWebAPI {
    static async getInitialGalaxy(url: string) {
        try {
            const response = await fetch(url, {
                method: 'GET',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
            });
            return response.json();
        } catch (err) {
            console.log(err);
        }
    }
} 