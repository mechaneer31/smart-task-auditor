import { useEffect } from 'react'

function App() {
    useEffect(() => {
        const testFetch = async () => {
            // Use your Postman Bearer token here just for this one test!
            const response = await fetch('/api/tasks', {
                headers: {
                    'Authorization': 'Bearer YOUR_POSTMAN_TOKEN'
                }
            });
            const data = await response.json();
            console.log("Success! Data from backend:", data);
        };

        testFetch();
    }, []);

    return <h1>Check the Console for your Tasks!</h1>
}

export default App