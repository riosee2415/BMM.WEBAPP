import React, { useState, useEffect } from "react";
import {useRouter} from "next/router";
import vData from "./vData";



const Notice = () => {

    const router = useRouter();
    const [target, setTarget] = useState(null);    
    
    
    useEffect(() => {

        const needValues = router.asPath.split("/");
        const targetId = parseInt(needValues [needValues.length - 1]);

        const targetData = vData.filter((item) => {
            if(item.id === targetId) {
                return item;
            }            
        });

        setTarget(targetData[0]);
    }, []);

    return (
        <div>
            {target ? (
                <div>
                    <div>{target.title}</div>
                    <div>{target.hit}</div>
                    <div>{target.createdAt}</div>
                </div>
            ) : (
                "존재하지 않는 게시글입니다."
            )};
        </div>
        );
};

export default Notice;