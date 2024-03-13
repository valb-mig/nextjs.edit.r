"use client";

import React, { useState, useEffect } from "react";

import { useRouter, usePathname } from "next/navigation";

import Sidebar from "@/app/components/Sidebar";
import Button from "@/app/components/Button";
import Input from "@/app/components/Input";
import Modal from "@/app/components/Modal";
import Tag from "@/app/components/Tag";
import TreeView from "@/app/components/TreeView";

import searchItemsJSON from "@/config/json/search_items.json";
import useCommandPalette from "@/app/hooks/useCommandPalette";
import Icon from "@/config/icons";

const AppLayout = ({ children }) => {
    const router = useRouter();

    const { runPalette } = useCommandPalette();

    const [modal, setModal] = useState(false);
    const [search, setSearch] = useState("");

    const searchItems = searchItemsJSON.filter((obj) =>
        search.length > 0 ? obj.icon.includes(search[0]) : obj,
    );

    const submitForm = () => {
        if (search != "") {
            if (runPalette(search)) {
                console.log("Ok Search");
            }
        }

        setSearch("");
        setModal(!modal);
    };

    /*
     *   Keyboard actions
     */

    useEffect(() => {
        function handleKeyDown(event) {
            if (event.key === "O" && event.shiftKey && event.altKey) {
                router.push("/");
                console.info("[shift + H]: Go Home");
            } else if (event.key === "N" && event.shiftKey && event.altKey) {
                setModal(!modal);
                console.info("[shift + N]: Palette");
            } else if (event.key === "Escape") {
                if (modal) {
                    setSearch("");
                    setModal(false);
                    console.log("[Close seach]");
                }
            }
        }

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [modal, router]);

    return (
        <>
            <Sidebar.Root>
                <Sidebar.Body>
                    <div className="flex w-full gap-2">
                        <Button
                            OnClick={() => {
                                router.push("/");
                            }}
                            Icon={<Icon.Home />}
                            Attributes={{ format: "full" }}
                        />
                        <Button
                            OnClick={() => setModal(!modal)}
                            Icon={<Icon.Terminal />}
                            Attributes={{ format: "full" }}
                        />
                        <Button
                            OnClick={() => {
                                setModal(!modal);
                                setSearch("+/");
                            }}
                            Icon={<Icon.Folder />}
                            Attributes={{ format: "full" }}
                        />
                    </div>
                    <Sidebar.Section Title="Files">
                        <TreeView.Root FilePath={usePathname()} />
                    </Sidebar.Section>
                </Sidebar.Body>
            </Sidebar.Root>

            <Modal.Root Id="command-palette" Show={modal}>
                <form
                    className="flex gap-2 flex-col p-2 w-[30vw] rounded bg-dark-0 border-[1px] border-dark-1"
                    onSubmit={submitForm}
                >
                    <Input
                        Icon={<Icon.Comma />}
                        Value={search}
                        Name="commandInput"
                        OnChange={(e) => setSearch(e.target.value)}
                    />
                    <div className="flex w-full flex-col justify-center rounded gap-1">
                        {searchItems.length > 0 ? (
                            searchItems.map((value, index) => (
                                <Tag
                                    key={index}
                                    Icon={value.icon}
                                    Title={value.title}
                                />
                            ))
                        ) : search.length === 1 ? (
                            <div>No command found :/</div>
                        ) : null}
                    </div>
                </form>
            </Modal.Root>

            <section
                id="content"
                className="flex flex-col bg-dark-0 w-full overflow-x-hidden"
            >
                {children}
            </section>
        </>
    );
};

export default AppLayout;
