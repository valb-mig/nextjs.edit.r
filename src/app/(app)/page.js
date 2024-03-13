"use client";

import React from "react";
import Tag from "@/app/components/Tag";

const Home = () => {
    return (
        <div className="flex flex-col">
            <div className="flex justify-content-center w-100">
                <div className="text-white mt-[30vh]">
                    <h2 className="flex justify-content-center border-b-[1px] text-[4em] border-dark-5">
                        edit.r
                    </h2>
                    <section
                        id="shortcuts"
                        className="border-[1px] border-dark-1 p-2 rounded mt-2"
                    >
                        <h3 className="flex justify-content-center">
                            Shortcuts
                        </h3>
                        <div className="flex flex-col gap-2">
                            <Tag Title="[shift + H]: Go Home" />
                            <Tag Title="[shift + alt + N]: New file" />
                            <Tag Title="[shift + alt + W]: Delete file" />
                        </div>
                    </section>
                </div>
            </div>
            <footer className="fixed text-sm bottom-0 w-full text-start p-1">
                <span className="border-1 border-green-400 text-green-400 p-1 rounded">
                    Beta v2
                </span>
            </footer>
        </div>
    );
};

export default Home;
