import React, { useEffect, useState } from 'react'
import E from 'wangeditor'
const Details = () => {
    let [discount, setdiscount] = useState<any>('')
    useEffect(() => {
        const editor = new E(document.getElementById('div1'))
        editor.create()
        editor.config.onchange = function (newHtml: any) {
            discount.value = newHtml;
        };
    }, [])
    return (
        <div>
            商品详情
            <div id="div1">

            </div>

        </div>
    )
}

export default Details
