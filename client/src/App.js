import CreatePost from 'pages/CreatePost';
import ListPost from 'pages/ListPost';

const App = () => {
	return (
		<div className='container'>
			<h1> Create Post </h1>
			<CreatePost />
			<br />
			<hr />
			<h1> List Post Component</h1>
			<ListPost />
		</div>
	);
};

export default App;
