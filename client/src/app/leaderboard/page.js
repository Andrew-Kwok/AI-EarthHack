"use client";
import Link from "next/link";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import API_URL from '../config';
import Report from "@/components/idea_report";
import axios from "axios";


export default function Page() {
    const router = useRouter();
    const [filterPrompt, setFilterPrompt] = useState('');
    const [ideas, setIdeas] = useState([]);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 10;
    const [selectedIndex, setSelectedIndex] = useState(0);

    const fetchIdeas = async () => {
        try {
            const res = await fetch(API_URL + '/get-idea-by-pagination?page=' + page + '&pageSize=' + pageSize);
            const data = await res.json();
            setIdeas(data.ideas);
            setTotalPages(data.totalPages);
            setSelectedIndex(0);

            console.log(data.ideas)
        } catch (error) {
            console.error('Error fetching ideas:', error);
        }
    }

    useEffect(() => {
        fetchIdeas().then(r => console.log(r));
    }, [page]);

    const handleSelectedIdeas = (index) => {
        setSelectedIndex(index);
    }

    const handlePrevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    }

    const handleNextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    }

    const handleInputChange = (e) => {
        setFilterPrompt(e.target.value);
    }

    const handleFilterPage = () => {
        try {
            const response = axios.get(API_URL + '/filter-idea-by-keyword?keyword=' + filterPrompt);
            fetchIdeas().then(r => console.log(r));
        } catch (error) {
            console.error('Error getting status:', error);
        }
    }

    const handleRefreshPage = () => {
        const response = axios.get(API_URL + '/filter-idea-by-keyword?keyword=');
        fetchIdeas().then(r => console.log(r));
    }

    return (
        <div data-theme="light" className="min-h-screen flex justify-center items-center bg-light_green">
            <div className="max-w-screen-2xl m-12">
                <div className="relative flex items-center mb-4">
                    <h1 className="font-bold text-2xl"> Idea Leaderboard </h1>
                    <Link href="/result" className="absolute left-[-30px] top-0 h-full text-2xl text-dark_green"> &#8592; </Link>

                    <button className="ml-4" onClick={handleRefreshPage}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 1536 1536"><path fill="currentColor" d="M1511 928q0 5-1 7q-64 268-268 434.5T764 1536q-146 0-282.5-55T238 1324l-129 129q-19 19-45 19t-45-19t-19-45V960q0-26 19-45t45-19h448q26 0 45 19t19 45t-19 45l-137 137q71 66 161 102t187 36q134 0 250-65t186-179q11-17 53-117q8-23 30-23h192q13 0 22.5 9.5t9.5 22.5m25-800v448q0 26-19 45t-45 19h-448q-26 0-45-19t-19-45t19-45l138-138Q969 256 768 256q-134 0-250 65T332 500q-11 17-53 117q-8 23-30 23H50q-13 0-22.5-9.5T18 608v-7q65-268 270-434.5T768 0q146 0 284 55.5T1297 212l130-129q19-19 45-19t45 19t19 45"/></svg>
                    </button>
                </div>

                <div className="form-control w-3/5 flex flex-row my-4">
                    <div className="relative w-full">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="16"
                            width="16"
                            viewBox="0 0 512 512"
                            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
                        >
                            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
                        </svg>
                        <input
                            name="searchbar"
                            type="text"
                            placeholder="Filter problem by keywords"
                            className="input w-full mx-2 pl-8"
                            value={filterPrompt}
                            onChange={handleInputChange}/>
                    </div>
                    <button
                        className="btn bg-dark_forest hover:bg-dark_green text-white mx-4 w-32"
                        onClick={handleFilterPage}
                    > Filter </button>
                </div>

                <div className="flex flex-row h-full">
                    <div className="overflow-x-auto flex flex-col w-full items-center">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr className="bg-middle_gray text-white h-16 align-text-bottom">
                                    <th>Rank</th>
                                    <th>Idea Name</th>
                                    <th>Category</th>
                                    <th>Points</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                            {ideas.map((idea, index) => (
                                <tr key={index} onClick={() => handleSelectedIdeas(index) } className={`h-16 border-t-8 border-light_green hover:cursor-pointer ${index === selectedIndex ? "bg-middle_green" : "bg-white"}`}>
                                    <th className="font-bold">{(page-1) * pageSize + index + 1}</th>
                                    <td className="min-w-72 font-bold">{idea.newName}</td>
                                    <td className="min-w-72 flex flex-row">
                                        {
                                            idea.tags.split(',').map((tag, index) => (
                                                <div key={index}
                                                     className="text-dark_green text-xs bg-card_color w-fit py-1 px-5 rounded-3xl m-1"
                                                     style={{ transform: 'translateX(-15px)' }}
                                                > {tag.trim()} </div>
                                            ))
                                        }
                                    </td>
                                    <td className="font-bold">{idea.score} pt</td>
                                    <td>&#8250;</td>
                                </tr>
                            ))}
                            {
                                Array.from({ length: pageSize - ideas.length }, (_, i) => (
                                    <tr key={i} className="h-16 bg-white border-t-8 border-light_green">
                                        <th className="font-bold"></th>
                                        <td className="min-w-48 font-bold"></td>
                                        <td className="min-w-40 flex flex-row">
                                        </td>
                                        <td className="font-bold"></td>
                                        <td></td>
                                    </tr>
                                ))
                            }
                            </tbody>
                        </table>
                        <div className="join mt-8">
                            <button className={`join-item btn btn-ghost hover:bg-light_green ${page === 1 ? "opacity-0 btn-disabled" : ""}`} onClick={handlePrevPage}> &#8249; </button>
                            <button className="join-item btn btn-ghost hover:bg-light_green">{page} / {totalPages}</button>
                            <button className={`join-item btn btn-ghost hover:bg-light_green ${page === totalPages ? "opacity-0 btn-disabled" : ""}`} onClick={handleNextPage}> &#8250; </button>
                        </div>
                    </div>

                    <div className="mx-8 overflow-y-auto">
                        {ideas.length > selectedIndex && <Report idea={ideas[selectedIndex]} />}
                    </div>
                </div>
            </div>
        </div>
    )
}