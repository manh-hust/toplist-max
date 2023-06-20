import { Avatar, Card, Empty } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { LANGUAGE_LOGO } from '../../constants/languageLogo';
import useSearchPlaces from '../../hooks/useSearchPlaces';
import useSearchStaffs from '../../hooks/useSearchStaff';
import popupSearchState from '../../recoil/popupSearch';


const { Meta } = Card;



const ListStaff = () => {
    const places = useSearchPlaces();
    const [selectedPlaceId, setSelectedPlaceId] = useState(null);
    const staffs = useSearchStaffs(selectedPlaceId);

    const handlePlaceSelect = (placeId) =>{
        setSelectedPlaceId(placeId)
    };



    return (
        <div className=''>
            <ul>
                {staffs && staffs.length >0 ? (
                    staffs.map((staff) => (
                        <li key={staff.id}>{staff.name}</li>
                    ))
                ) : (
                    <li> no stastaffs</li>
                )
                    
                }                
            </ul>
        </div>
    )

};

export default ListStaff;
