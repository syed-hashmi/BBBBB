import { useEffect, useState } from "react"
import axiosInstance from "../shared/axios-config"
import "./Pagination.css"
import { useSelector } from "react-redux"
const limit = 10


const Pagination = () => {
    // useSelector((data)=>{
    //     debugger;
    //     console.log(data)
    // })


    const apiUrl = import.meta.env.VITE_API_URL;
    const appName = import.meta.env.VITE_APP_NAME;
    console.log(apiUrl);
    console.log(appName);
    const [productList, setProductList] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const fetchPaginationData = async (controller) => {
        const response = await axiosInstance.get(`/products?limit=${limit}&skip=${currentPage * limit}`, {
            signal: controller?.signal
        })
        if (response?.data?.products?.length > 0)
            setProductList([...response.data.products]);
        if ((response?.data?.total % limit) > 0)
            setTotalPages(Math.floor(response?.data?.total / limit) + 1)
        else
            setTotalPages(Math.floor(response?.data?.total / limit))

    }
    useEffect(() => {
        const controller = new AbortController();
        fetchPaginationData(controller)
        return () => {
            controller.abort();
        }
    }, [currentPage])

    const handleNextPrev = (key) => {
        switch (key) {
            case "prev":

                setCurrentPage(prev => {
                    if (prev != 0)
                        return prev - 1
                    else
                        return prev;
                })
                break;
            case "nex":
                setCurrentPage(prev => {
                    if (prev < 19)
                        return prev + 1
                    else
                        return prev;
                })
                break;
            default:
                break;
        }
    }

    return (
        <div className="pagination">

            <div className="pagination-class">
                <button onClick={() => handleNextPrev("prev")}>Previous</button>

                {totalPages && Array.from({ length: totalPages })?.map((data, index) => {
                    return <div>{index + 1}</div>
                })}

                <button onClick={() => handleNextPrev("nex")}>Next</button>
            </div>

            <div>
                My Current Page: {currentPage}
            </div>

            <div>
                {productList && productList?.map((dta) => {
                    return <>
                        <span>{dta?.id}</span>
                    </>
                })}
            </div>
        </div>
    )
}

export default Pagination