import { Injectable } from '@nestjs/common'
import * as multer from 'multer'
Injectable()


export class FileUpload {
  uploadFile = (params, req, res) => {
    return new Promise((resolve, reject) => {
      try {
        console.log('params :-------------------', params)
        let imageName = ''
        const storage = multer.diskStorage({
          destination: (req, file, callback) => {
            callback(null, '../../upload/' + params.destination)
          },
          filename: (req, file, callback) => {
            const exe = file.originalname.split('.')
            imageName = Date.now() + '.' + exe[exe.length - 1]
            callback(null, imageName)
          },
        })

        const upload = multer({
          storage: storage,
        }).array(params.fieldName)
        upload(req, res, (err, result) => {
          if (err) {
            console.log('error :----', err)
            reject(err)
          } else {
            console.log('imageName :--------------', imageName)
            resolve(imageName)
          }
        })
      } catch (err) {
        console.log('error :----', err)
        reject(err)
      }
    })
  }
}
