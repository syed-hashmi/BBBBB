import React, { useState, useEffect, useRef } from 'react'
import axiosInstance from '../shared/axios-config';
import "./InfiniteScroll.css"
const limit = 10
const InfiniteScroll = () => {
    const [currentPage, setCurrentPage] = useState(0);

    const [items, setItems] = useState([]);
    const totalPages = useRef();


    useEffect(() => {
        const scrollBottom = () => {
            if ((window?.innerHeight + window?.scrollY) >= (document.documentElement.scrollHeight - 10)) {
                setCurrentPage(prev => {
                    if (prev < totalPages.current - 1) {
                        return prev + 1;
                    }

                    return prev;
                });
            }
        }

        window?.addEventListener("scroll", scrollBottom);
        return () => {
            window.removeEventListener("scroll", scrollBottom)
        }
    }, [])

    const fetchNewData = async (abortController) => {
        try {
            const data = await axiosInstance.get(`/products?limit=${limit}&skip=${currentPage * limit}`, {
                signal: abortController?.signal
            })
            totalPages.current = data?.data?.total % 10 == 0 ? Math.floor(data?.data?.total / limit) : Math.floor(data?.data?.total / limit) + 1


            setItems(prev => {return [...prev, ...data?.data?.products]})

        } catch (error) {
            console.log(JSON.stringify(error))
        }

    }
    useEffect(() => {
        const abortController = new AbortController();
        fetchNewData(abortController)
        return () => {
            abortController?.abort()
        }
    }, [currentPage])
    return (
        <div className='infiniteScrollHeight'>
            {items && items?.map((data, i) => {
                return <div style={{ minHeight: "85px" }} key={i}> {data?.id}</div>
            })}
        </div>
    )
}

export default InfiniteScroll