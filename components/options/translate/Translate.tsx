import Tippy from "@tippyjs/react";
import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import Select from "react-select";
import { useAppContext } from "@/helpers/Helpers";
import toast from "react-hot-toast";
import "./translate.css";
type Props = {};

const Translate = (props: any) => {
  const { contextValue }: any = useAppContext();

  const [languageToBeTranslatedTo, setlanguageToBeTranslatedTo] = useState<any>(
    []
  );
  const [countryValue, setCountryValue] = React.useState<any>();

  useEffect(() => {
    axios
      .get("https://keep-backend-theta.vercel.app/api/notes/getall-languages")
      .then((res) => setlanguageToBeTranslatedTo(res.data.languages))
      .catch((err) => console.log(err));
  }, []);

  const CustomStyle = {
    option: (base: any, state: any) => ({
      ...base,
      backgroundColor: state.isSelected ? "#444547" : "#202124",
    }),
    menuList: (base: any) => ({
      ...base,
      "::-webkit-scrollbar": {
        width: "4px",
        height: "0px",
      },
      "::-webkit-scrollbar-track": {
        background: "#f1f1f1",
      },
      "::-webkit-scrollbar-thumb": {
        background: "#444547",
      },
      "::-webkit-scrollbar-thumb:hover": {
        background: "red",
      },
    }),
  };
  const changeHandler = async (countryValue: any) => {
    setCountryValue(countryValue);
    const noteObject = {
      _id: props?.trashNote?._id,
      targetLanguage: countryValue?.value,
    };
    try {
      await axios
        .post("https://keep-backend-theta.vercel.app/api/notes/translate", {
          noteObject,
        })
        .then((res) =>
          contextValue?.setNotes((prevNotes: any) => {
            return prevNotes.map((note: any) => {
              if (note._id == props?.trashNote?._id) {
                return {
                  ...note,
                  note: res.data.foundNote.note,
                };
              }
              return note;
            });
          })
        )
        .catch((err) => console.log(err));
      props?.setTranslateModal(false);
      toast.success(`Note translated to ${countryValue?.label}`);
    } catch (error) {
      error && toast.error("translation failed");
    }
  };

  const options = languageToBeTranslatedTo.map((language: any) => ({
    value: language.code,
    label: language.name,
  }));

  return (
    <div className="absolute z-30 top-[160px] left-0 w-full h-[150px] bg-darkmode  ">
      {languageToBeTranslatedTo ? (
        <Select
          styles={CustomStyle}
          placeholder={countryValue ? countryValue?.label : "Translate to"}
          options={options}
          value={countryValue}
          onChange={changeHandler}
          closeMenuOnSelect
          className="bg-transparent"
        />
      ) : (
        <div className="flex justify-center text-center mx-[auto] w-full ">
          <span style={{ textAlign: "center" }} className="loader"></span>
        </div>
      )}
    </div>
  );
};

export default Translate;
