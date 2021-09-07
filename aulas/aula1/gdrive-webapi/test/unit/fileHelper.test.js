import {describe,test,expect,jest} from "@jest/globals"
import fs from 'fs'
import FileHelper from "../../src/fileHelper.js"
import Routes from './../../src/routes.js'
describe("#FileHelper",()=>{
    describe('#getFileStatus',()=>{
        test('if should return files status in correct format',async()=>{
            const statMock={
                dev: 44,
                mode: 33279,
                nlink: 1,
                uid: 1000,
                gid: 1000,
                rdev: 0,
                blksize: 512,
                ino: 5910974511023805,
                size: 29,
                blocks: 0,
                atimeMs: 1631025185181.0127,
                mtimeMs: 1631025184445.961,
                ctimeMs: 1631025184445.961,
                birthtimeMs: 0,
                atime: '2021-09-07T14:33:05.181Z',
                mtime: '2021-09-07T14:33:04.446Z',
                ctime: '2021-09-07T14:33:04.446Z',
                birthtime: '1970-01-01T00:00:00.000Z'
            }
            const mockUser='rodrigo'
            process.env.USER=mockUser
            const fileName='file.txt'
            jest.spyOn(fs.promises,fs.promises.readdir.name)
                .mockResolvedValue([fileName])

            jest.spyOn(fs.promises,fs.promises.stat.name)
                .mockResolvedValue(statMock)
            
            const result= await FileHelper.getFilesStatus('/tmp')
            const expectedResult=[{
                size: '29 B',
                lastModified: statMock.birthtime,
                owner:mockUser,
                file:fileName
            }]
            expect(fs.promises.stat).toHaveBeenCalledWith(`/tmp/${fileName}`)
            expect(result).toMatchObject(expectedResult)
        })
    })

})
