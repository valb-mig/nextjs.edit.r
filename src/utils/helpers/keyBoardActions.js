// const keyBoardActions = (event, setSelectedFile, selectedFile, setIsOpen, isOpen) => {
//     if (event.key === 'H' && event.shiftKey) {

//         if(selectedFile !== false) {
//             setSelectedFile(false);
//         }
//         console.info('[shift + H]: Go Home');

//     } else if(event.key === 'N' && event.shiftKey && event.altKey) {

//         if(!isOpen) {
//             setIsOpen(true);
//             console.info('[shift + alt + N]: (open) New file');
//         }
//         else {
//             setIsOpen(false);
//             console.info('[shift + N]: (close) New file');
//         }

//     } else if(event.key === 'W' && event.shiftKey && event.altKey) {

//         if(selectedFile !== false) {
//             removeSelectedFile();
//             console.info('[shift + alt + W]: Delete file');
//         }
//     }
// }

// export default keyBoardActions;