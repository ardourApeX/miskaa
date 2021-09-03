import "./App.css";
import { useEffect, useState } from "react";
import Loader from "./components/Loader";
import axios from "axios";
import { GrRefresh } from "react-icons/gr";
function App() {
	const [data, setData] = useState([]);
	const [loader, setLoader] = useState("loading");
	console.log(data);
	async function fetchData() {
		try {
			setLoader("loading");
			setData([]);
			const serverResponse = await axios.get(
				"https://restcountries.eu/rest/v2/region/asia"
			);
			setTimeout(() => {
				setData(serverResponse.data);
				setLoader("fulfilled");
			}, 1000);
			console.log(data);
		} catch (error) {
			console.log(error);
			alert(error);
			setLoader("idle");
		}
	}

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className="App">
			{loader === "loading" && <Loader />}
			<table className="table">
				<tr className="table-heading">
					<th>Name</th>
					<th>Capital</th>
					<th>Flag</th>
					<th>Region</th>
					<th>Subregion</th>
					<th>Population</th>
					<th>Borders</th>
					<th>Langages</th>
				</tr>
				{data.map((item) => {
					return (
						<tr>
							<td>{item.name}</td>
							<td>{item.capital}</td>
							<td>
								<img class="flag" src={item.flag} alt="flag"></img>
							</td>
							<td>{item.region}</td>
							<td>{item.subregion}</td>
							<td>{item.population}</td>
							<td>
								<ul>
									{item.borders.map((border) => {
										return <li>{border}</li>;
									})}
								</ul>
							</td>
							<td>
								<ul>
									{item.languages.map((language) => {
										return <li>{language.name}</li>;
									})}
								</ul>
							</td>
						</tr>
					);
				})}
			</table>
			<div className="refresh-button">
				<button onClick={fetchData}>
					<GrRefresh
						style={{ fontSize: "30px", color: "white", fontWeight: "bolder" }}
					/>
				</button>
			</div>
		</div>
	);
}

export default App;
