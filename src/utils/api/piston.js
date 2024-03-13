import axios from "axios";

import getLanguage from "@/utils/helpers/getLanguage";

const apiUrl = process.env.NEXT_PUBLIC_API_PISTON_URL;

async function executeCode(file) {
    let requestObj = {
        language: file.type,
        version: getLanguage(file.type).version,
        files: [
            {
                name: file.name + "." + file.type,
                content: file.body,
            },
        ],
        stdin: "",
        args: ["1", "2", "3"],
        compile_timeout: 10000,
        run_timeout: 3000,
        compile_memory_limit: -1,
        run_memory_limit: -1,
    };

    console.log("[Req]: ", requestObj);

    return axios
        .post(apiUrl + "/execute", requestObj)
        .then(function (res) {
            console.log("[Res]: ", res.data);
            return res.data;
        })
        .catch(function (error) {
            console.error("Erro ao enviar os dados:", error);
            return false;
        });
}

export default executeCode;
