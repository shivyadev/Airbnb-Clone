import { useState } from "react";
import Icons from "./Icons";

export default function PopUp({ showPopUp, setShowPopUp, desc, extraInfo }) {
    if (showPopUp) {
        return (
            <div id="popup" className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
                <div className="relative bg-white w-7/12 h-5/6 rounded-2xl shadow-2xl overflow-auto">
                    <div className="m-10">
                        <div className="pt-8 pb-4">
                            <h2 className="text-3xl font-semibold">About this space</h2>
                        </div>
                        <div className="mt-1">
                            <p className="text-md font-light leading-relaxed">{desc}</p>
                        </div>
                        <div className="mt-10">
                            <h3 className="text-lg font-semibold text-gray-700">Other things to note</h3>
                            <div className="mt-1">
                                <p className="font-light leading-relaxed">{extraInfo}</p>
                            </div>
                        </div>
                    </div>
                    <button className="absolute top-5 left-5 bg-white" onClick={() => setShowPopUp(false)}>
                        <div className="p-1 rounded-2xl hover:bg-gray-200">
                            <Icons iconName={"cross"} styles="w-6 h-6" />
                        </div>
                    </button>
                </div>
            </div >
        );
    } else {
        return '';
    }
}