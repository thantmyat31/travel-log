import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import { getLogEntries } from './API/API';
import LogEntryForm from './components/LogEntryForm';

const App = () => {
	const [ logEntries, setLogEntries ] = useState([]);
	const [ showPopup, setShowPopup ] = useState({});
	const [ addEntryLocation, setAddEntryLocation ] = useState(null);
	const [ viewport, setViewport ] = useState({
		width: '100vw',
		height: '100vh',
		latitude: 16.871311,
		longitude: 96.199379,
		zoom: 10
	});

	useEffect(() => {
		getData();
	}, []);

	const getData = async () => {
		const response = await getLogEntries();
		setLogEntries(response);
	};

	const showAddMarkerPopup = (event) => {
		const longitude = event.lngLat[0];
		const latitude = event.lngLat[1];
		setAddEntryLocation({ longitude, latitude });
	};

	return (
		<ReactMapGL
			{...viewport}
			mapStyle="mapbox://styles/thantmyat/ckglza5720hc519qli7hz2f2x"
			mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
			onViewportChange={(nextViewport) => setViewport(nextViewport)}
			onDblClick={showAddMarkerPopup}
		>
			{logEntries.map((entry) => (
				<React.Fragment key={entry._id}>
					<Marker latitude={entry.latitude} longitude={entry.longitude} offsetLeft={-12} offsetTop={-24}>
						<div
							onClick={() =>
								setShowPopup({
									[entry._id]: true
								})}
						>
							<svg
								className="marker"
								viewBox="0 0 24 24"
								width="24"
								height="24"
								stroke="#F8C200"
								strokeWidth="3"
								fill="none"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
								<circle cx="12" cy="10" r="3" />
							</svg>
						</div>
					</Marker>
					{showPopup[entry._id] ? (
						<Popup
							className="popup"
							latitude={entry.latitude}
							longitude={entry.longitude}
							closeButton={true}
							closeOnClick={false}
							dynamicPosition={true}
							onClose={() => setShowPopup({})}
							anchor="top"
						>
							<div>
								<h5>{entry.title}</h5>
								<p>{entry.description}</p>
								<p>{entry.comments}</p>
								{entry.image && <img src={entry.image} alt="Location" />}
								<small>Visited on {new Date(entry.visitDate).toDateString()}</small>
							</div>
						</Popup>
					) : null}
				</React.Fragment>
			))}
			{addEntryLocation ? (
				<React.Fragment>
					<Marker
						latitude={addEntryLocation.latitude}
						longitude={addEntryLocation.longitude}
						offsetLeft={-12}
						offsetTop={-24}
					>
						<div>
							<svg
								className="marker"
								viewBox="0 0 24 24"
								width="24"
								height="24"
								stroke="red"
								strokeWidth="3"
								fill="none"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
								<circle cx="12" cy="10" r="3" />
							</svg>
						</div>
					</Marker>
					<Popup
						className="popup"
						latitude={addEntryLocation.latitude}
						longitude={addEntryLocation.longitude}
						closeButton={true}
						closeOnClick={false}
						dynamicPosition={true}
						onClose={() => setAddEntryLocation(null)}
						anchor="top"
					>
						<div>
							<h5>Add your new log entry here</h5>
							<LogEntryForm
								onClose={() => {
									setAddEntryLocation(null);
									getData();
								}}
								location={addEntryLocation}
							/>
						</div>
					</Popup>
				</React.Fragment>
			) : null}
		</ReactMapGL>
	);
};

export default App;
