import { Avatar, Card, Empty } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { LANGUAGE_LOGO } from '../../../constants/languages';
import popupSearchState from '../../../recoil/popupSearch';
import Search from './Search';
const { Meta } = Card;

const ListPlace = ({ places }) => {
	const popupState = useRecoilValue(popupSearchState);
	return (
		<div className="flex mt-12 mb-12">
			<div
				className={`flex h-auto flex-wrap ml-6 ${
					popupState ? 'w-2/3 justify-start' : 'w-full justify-start'
				}`}
			>
				{!places || places.length <= 0 ? (
					<div className="flex justify-center w-full mt-24">
						<Empty />
					</div>
				) : (
					places.map((place) => (
						<Link to={`/massage-places/${place.id}`}>
							<Card
								className="mx-6 my-4 relative"
								hoverable
								style={{ width: 246, height: 450 }}
								cover={
									<img
										alt="example"
										src={
											place.photoUrl
												? place.photoUrl
												: 'https://cdn.spafinder.com/2015/08/massage.jpg'
										}
										className="h-80 w-full object-cover"
									/>
								}
							>
								<Avatar.Group
									className="absolute top-0 right-0"
									maxCount={2}
									maxPopoverTrigger="click"
									size="large"
									maxStyle={{
										color: '#f56a00',
										backgroundColor: '#fde3cf',
										cursor: 'pointer',
									}}
								>
									{place.serviceLanguages.map((serviceLanguage) => (
										<Avatar src={LANGUAGE_LOGO[serviceLanguage.language]} />
									))}
								</Avatar.Group>
								<Meta title={place.name} description={place.address} />
							</Card>
						</Link>
					))
				)}
			</div>
			<div className="flex-1">{popupState && <Search />}</div>
		</div>
	);
};

export default ListPlace;
