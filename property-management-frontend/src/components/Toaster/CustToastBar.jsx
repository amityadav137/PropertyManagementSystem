import React from 'react'
import { Toaster } from 'react-hot-toast';


const CustomToastBar = () => {
    return <Toaster
        position="right-top"
        reverseOrder={false}
        gutter={0}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
            duration: 3000,
        }}
    />
}



export default CustomToastBar