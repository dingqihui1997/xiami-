import React, { useEffect } from 'react'
import E from 'wangeditor'
const Details = () => {
    useEffect(() => {
        const editor = new E(document.getElementById('div1'))
        editor.create()
        editor.config.onchange = function (newHtml: any) {
            goods_introduce.value = newHtml;
        };

    }, [])
    return (
        <div>
            商品详情
            <div>

            </div>

        </div>
    )
}

export default Details
