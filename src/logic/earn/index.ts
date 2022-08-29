import {ref} from 'vue'
export const chainName=ref('')
export const icons={
    ETH:'/public/images/earn/ethColor.png',
    SOL:'/public/images/earn/solColor.png'
}
export const getAddress = () => {
    if(!localStorage.getItem('followList')) return []
    //@ts-ignore
    return JSON.parse(localStorage.getItem('followList'))
}
export const addAddrees=(value:string)=>{
    const address=value?value.trim():''
    if(!localStorage.getItem('followList')) {
        return localStorage.setItem('followList',JSON.stringify([address]))
    }
    //@ts-ignore
    const list=JSON.parse(localStorage.getItem('followList'))
    if(!list?.includes(address)){
        list.push(address)
    }
    localStorage.setItem('followList',JSON.stringify(list))
}
export const removeAddrees=(value:string)=>{
    const address=value?value.trim():''
    if(!localStorage.getItem('followList')) return
    //@ts-ignore
    const list=JSON.parse(localStorage.getItem('followList'))
    const index=list?.indexOf(address)
    list?.splice(index,1)
    localStorage.setItem('followList',JSON.stringify(list))
}
export const isFollow=(value:string)=>{
    const address=value?value.trim():''
    if(!localStorage.getItem('followList')) return false
    //@ts-ignore
    const list=JSON.parse(localStorage.getItem('followList'))
    if(list?.includes(address)){
        return true
    }
    return false
}