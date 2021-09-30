const router = require('express').Router()
const fs = require('fs')
const uniqid = require('uniqid')


const getResults = () => {
    const results = fs.readFileSync('./data/result.json')
    return JSON.parse(results)
}

const newResult = (req) => ({
    id: uniqid,
    nodesSearched: req.body.searchedNodes,
    shortestPath: req.body.path
})

router.post('/', (req, res) => {
    const results = getResults()
    const result = newResult(req)

    results.push(result)

    fs.writeFileSync('./data/result.json', JSON.stringify(results))

    return res.status(201).json(result)
})

module.exports = router