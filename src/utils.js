import {baseURL} from './api/axiosClient'
import {questionTypeLabels} from './consts'
import {ReactComponent as Chose1} from './assets/images/report/chose1.svg'
import {ReactComponent as Chose2} from './assets/images/report/chose2.svg'
import {ReactComponent as Chose3} from './assets/images/report/chose3.svg'
import {ReactComponent as Chose4} from './assets/images/report/chose4.svg'

export const handleUploadImage = async (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = async () => {
            try {
                const path = `${baseURL}/image/upload`
                const res = await fetch(path, {
                    method: 'POST',
                    body: JSON.stringify({data: reader.result}),
                    headers: {'Content-Type': 'application/json'},
                }).then((res) => res.json())
                resolve(res.secure_url)
            } catch (err) {
                console.error(err)
                reject(err)
            }
        }
        reader.onerror = (err) => {
            reject(err)
        }
    })
}
export const formatNumber = (number) => new Intl.NumberFormat('en-US', {style: 'percent'}).format(number * 10)
export const getTypeQuestion = (questionId) => {
    switch (questionId) {
        case 1:
            return questionTypeLabels['SINGLE_CORRECT_ANSWER']
        case 2:
            return questionTypeLabels['MULTIPLE_CORRECT_ANSWER']
        case 3:
            return questionTypeLabels['TRUE_FALSE_ANSWER']
        default:
            return questionTypeLabels['TYPE_ANSWER']
    }
}
