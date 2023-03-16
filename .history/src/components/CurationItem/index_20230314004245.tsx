import React from "react";
import { Curation } from "../CreateCuration";
import DeleteScheduleItem from "../../assets/Icon/DeleteScheduleItem.svg";
import CurationAdd from "../../assets/Icon/CurationAdd.svg";
import CuationAPI from "../../api/CurationAPI";

export interface AllCuration {
  id: number;
  title: string;
}
const CurationItem = ({ id, title }: AllCuration) => [];
