import { Injectable } from '@nestjs/common'
import * as nodemailer from 'nodemailer'
import { Observable, observable } from 'rxjs'

Injectable()
export class Email {
  email = (params): Observable<any> => {
    return new Observable((observer) => {
      const smtpTransport = nodemailer.createTransport({
        // host: 'smtp.gmail.com',
        // port: 587,
        secure: true,
        // service: 'Gmail',
        auth: {
          user: 'singhsantosh.edu.in@gmail.team',
          pass: 'singh@123',
        },
      })
      params.froms = 'singhsantosh.edu.in@gmail.team'
      smtpTransport.sendMail(params, (err, info) => {
        if (err) observer.error(err)
        if (info) observer.next(info)
        observer.complete()
      })
    })
  }
}
