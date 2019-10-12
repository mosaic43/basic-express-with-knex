const fs = require('fs')
const mustache = require('mustache')

const express = require('express')
const app = express()

const dbConfigs = require('./knexfile.js')
const db = require('knex')(dbConfigs.development)

const port = 3003

// -----------------------------------------------------------------------------
// Express.js Endpoints

const homepageTemplate = fs.readFileSync('./templates/homepage.mustache', 'utf8')
const cohortsTemplate = fs.readFileSync('./templates/cohortsTemplate.mustache', 'utf8')
const studentsTemplate = fs.readFileSync('./templates/studentsTemplate.mustache', 'utf8')

app.get('/', function (req, res) {
  getAllCohorts()
    .then(function (allCohorts) {
      res.send(mustache.render(homepageTemplate, {cohortsListHTML: renderAllCohorts(allCohorts)}))
    })
})

app.get('/students/:name', function (req, res) {
  getOneStudent(req.params.name)
    .then(function (student) {
      res.send(mustache.render(studentsTemplate, {studentsListHTML: renderStudent(student)}))
    })
    .catch(function (err) {
      res.status(404).send('sudents not found :(')
    })
})

app.get('/cohorts/2018-09-houston-flex', function (req, res) {
  
  getAllCoTwoStudents()
      .then(function (allStudents) {
        res.send(mustache.render(studentsTemplate, {studentsListHTML: renderAllStudents(allStudents)}))
      })
})
app.get('/cohorts/2019-06-houston-flex', function (req, res) {
  
  getAllCoOneStudents()
      .then(function (allStudents) {
        res.send(mustache.render(studentsTemplate, {studentsListHTML: renderAllStudents(allStudents)}))
      })
})

app.get('/cohorts/:slug', function (req, res) {
  getOneCohort(req.params.slug)
    .then(function (cohort) {
      //res.send('<pre>' + prettyPrintJSON(cohort) + '</pre>')
      res.send(mustache.render(cohortsTemplate, {cohortsListHTML: renderCohort(cohort)}))
    })
    .catch(function (err) {
      res.status(404).send('cohort not found :(')
    })
})

app.listen(port, function () {
  console.log('Listening on port ' + port + ' 👍')
})

// -----------------------------------------------------------------------------
// HTML Rendering

function renderCohort (cohort) {
  return `<li><a href="/cohorts/${cohort.slug}">${cohort.title}</a></li>`
}

function renderAllCohorts (allCohorts) {
  return '<ul>' + allCohorts.map(renderCohort).join('') + '</ul>'
}

function renderStudent (student) {
  return `<li><a href="/students/${student.name}">${student.name}</a></li>`
}

function renderAllStudents (allStudents) {
  return '<ul>' + allStudents.map(renderStudent).join('') + '</ul>'
}



// -----------------------------------------------------------------------------
// Database Queries

const getAllCohortsQuery = `
  SELECT *
  FROM Cohorts
`

function getAllCohorts () {
  return db.raw(getAllCohortsQuery)
}

function getOneCohort (slug) {
  return db.raw('SELECT * FROM Cohorts WHERE slug = ?', [slug])
         .then(function (results) {
           if (results.length !== 1) {
             throw null
           } else {
             return results[0]
           }
         })
}
const getAllStudentsQuery = `
  SELECT *
  FROM Students
  `

function getAllStudents () {
  return db.raw(getAllStudentsQuery)
}

function getOneStudent (name) {
  return db.raw('SELECT * FROM Students WHERE name = ?', [name])
    .then(function (results){
      if (results.length !== 1) {
        throw null
      } else {
        return results[0]
      }
    })
}

const getAllStudentsofCoOneQuery = `
  SELECT Students.name
  FROM Students 
  WHERE cohortId = 1
  `
function getAllCoOneStudents () {
    return db.raw(getAllStudentsofCoOneQuery)
  }

const getAllStudentsofCoTwoQuery = `
  SELECT Students.name
  FROM Students 
  WHERE cohortId = 2
  `
function getAllCoTwoStudents () {
    return db.raw(getAllStudentsofCoTwoQuery)
  }

// -----------------------------------------------------------------------------
// Misc

function prettyPrintJSON (x) {
  return JSON.stringify(x, null, 2)
}
