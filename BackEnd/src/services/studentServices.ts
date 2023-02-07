import { Request, Response, NextFunction } from 'express';
import { PostgresDataSource } from '../configs/db';
import { Student } from '../models/StudentModel';

export async function getStudents(req: Request, res: Response, next: NextFunction) {
    try {
        return await Student.find()
    } catch (err) {
        next(err)
    }
}

export async function addNewStudent(req: Request, res: Response, next: NextFunction) {
    try {
        const newStudent = new Student();
        newStudent.name = req.body.name;
        newStudent.gender = req.body.gender;
        newStudent.address = req.body.address;
        newStudent.mobile = req.body.mobile;
        newStudent.dob = new Date(req.body.dob);
        newStudent.age = req.body.age;

        await PostgresDataSource.manager.save(newStudent);
        const student = PostgresDataSource.getRepository(Student).create(newStudent);
        return await PostgresDataSource.getRepository(Student).save(student);

    } catch (err) {
        next(err)
    }
}

export async function updateSelectedStudent(req: Request, res: Response, next: NextFunction) {
    try {
        const id = +req.params.id;
        const studentRepository = PostgresDataSource.getRepository(Student);
        const studentToUpdate = await studentRepository.findOneBy({
            id: id
        });
        if(studentToUpdate){
            studentToUpdate!.name = req.body.name;
            studentToUpdate!.gender = req.body.gender;
            studentToUpdate!.address = req.body.address;
            studentToUpdate!.mobile = req.body.mobile;
            studentToUpdate!.dob = new Date(req.body.dob);
            studentToUpdate!.age = req.body.age;
            return await studentRepository.save(studentToUpdate!);
        }else{
            return null
        }
    }catch (err) {
        next(err)
    }
}

export async function deleteSelectedStudent(req: Request, res: Response, next: NextFunction) {
    try {
        const id = +req.params.id;
        const studentRepository = PostgresDataSource.getRepository(Student);
        const studentToRemove = await studentRepository.findOneBy({
            id: id
        });
        if(studentToRemove){
            return await studentRepository.remove(studentToRemove!);
        }else{
            return null
        }
    }catch (err) {
        next(err)
    }
}