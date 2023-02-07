import { Request, Response, NextFunction } from 'express'
import { addNewStudent, deleteSelectedStudent, getStudents, updateSelectedStudent,  } from '../services/studentServices'
const { validateStudentRecords } = require('./validator')

export async function getAllStudents(req: Request, res: Response, next: NextFunction) {
  try{
      const students = await getStudents(req, res, next)
      res.status(200).json(students)
  } catch(err: any){
      next(err)
  }
}

export async function addStudent(req: Request, res: Response, next: NextFunction) {
      delete req.body.inEdit
      const{error} = validateStudentRecords(req.body)
      if(!error){
        try{

          const newStudent = await addNewStudent(req,res, next)
          res.status(201).json(newStudent)
        } catch(err: any){
          next(err)
        }
      }else{
        console.error(error)
        res.status(400).send(error)
      }
}

export async function updateStudent(req: Request, res: Response, next: NextFunction) {
  delete req.body.id
  delete req.body.inEdit
  const {error} = validateStudentRecords(req.body)
  if(!error){
    try{
      const updatedStudent = await updateSelectedStudent(req, res, next)
      if(updatedStudent){
        res.status(200).json(updatedStudent)
      }else{
        next(new Error('Student does not exists for this ID'))
      }
    } catch( err: any){
      next(err)
    }
  }else{
    console.error(error)
    res.status(400).send(error)
  }
}

export async function deleteStudent(req: Request, res: Response, next: NextFunction) {
  try{
    const deletedStudent = await deleteSelectedStudent(req, res, next)
    if(deletedStudent){
      res.status(204).json()
    } else{
      next(new Error('Student does not exists for this ID'))
    }
  } catch(err: any){
    next(err)
  }
}
