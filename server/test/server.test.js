const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server.js');
const {Todo} = require('./../models/todo');

const todos = [{
    _id: new ObjectID(),
    text: 'First test todo'
}, {
    _id: new ObjectID(),
    text: 'Second test todo'
}];

beforeEach((done) => {
    Todo.remove({}).then(() => {        
       return Todo.insertMany(todos);
    }).then(() => done());
});


describe('Post /todos', () => {
    it('should create a new todo', (done) => {
        var text = 'Test todo text';
        var completed = true;
        request(app)
        .post('/todos')
        .send({
         text,
         completed
        })
        .expect(200)
        .expect((res) => {
            expect(res.body.text).toBe(text);
            expect(res.body.completed).toBe(completed);
        })
        .end((err, res) => {
            if(err) {
                return done(err);
            }
            Todo.find({text}).then((todos) => {
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                expect(todos[0].completed).toBe(completed);
                done();
            }).catch((e) => done(e));
        });

    });

    it('should not create todo with invalid body data', (done) => {
        request(app)
        .post('/todos')
        .send({})
        .expect(400)
        .end((err, res) => {
            if(err) {
                return done(err);
            }
            Todo.find().then((todos) => {
                expect(todos.length).toBe(2);
                done();
            }).catch((e) => done(e))
        })
    })
});


describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res) => {
            expect(res.body.todos.length).toBe(2);
        })
        .end(done);
    })
});

describe('GET /todos/:id', () => {
    it('should get todos relsted to perticular id', (done) => {
            request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.text).toBe(todos[0].text)
            })
            .end(done);
    });
    it('should return 404 if todo not found', (done) => {
        request(app)
        .get(`/todos/$(new ObjectID())`)
        .expect(404)
        .end(done);
    });
});

describe('DELETE /todos/delete/:id', () => {
    it('should delete todo related to perticular id', (done) => {
        request(app)
        .delete(`/todos/delete/${todos[1]._id.toHexString()}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.todos.text).toBe(todos[1].text);
        })
        .end((err, res) => {
            if(err) {
                done(err);
            };
            Todo.findById(`${todos[1]._id.toHexString()}`).then((res) => {
                expect(res).not;
                done();
            }).catch(err => done(err));
        });
    });
    it('should return 404 if todo not found', (done)=> {
        var id1= new ObjectID();
        request(app)
        .delete(`/todos/delete/${id1}`)
        .expect(404)
        .end(done);

    });
    it('should return 404 if id id invalid', (done) => {
        request(app)
        .delete(`/todos/delete/1234567}`)
        .expect(404)
        .end(done);
    })
})