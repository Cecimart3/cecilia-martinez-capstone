import axios from 'axios'

const visualizerUrl = 'http://localhost:8080'

const visualizerRequest = axios.create({
    baseURL: visualizerUrl,
    headers: {
        'Content-Type': 'application/json',
    }
})

const visualizerRequests = {
    postGridResults: (data) => visualizerRequest.post('/results', data)
}

export default visualizerRequests