import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView, Button } from 'react-native';
import { petsFetch } from '../actions';
import ListItem from '../components/ListItem';


class HouseholdScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
		title: 'Household',
		headerRight: (
			<Button
				title='Add Pet'
				onPress={() => navigation.navigate('create')}
				backgroundColor="rgba(0,0,0,0)"
				color="rgba(0,122,255,1)"
			/>
		)
	});

	componentWillMount() {
		this.props.petsFetch();

		this.createDataSource(this.props);
	}

	componentWillReceiveProps(nextProps) {
		// nextProps are the next set of props that this component
		// will be rendered with
		// this.props is still the old set of props

		this.createDataSource(nextProps);
	}

	createDataSource({ pets }) {
		const ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		});

		this.dataSource = ds.cloneWithRows(pets);
	}

	renderRow(pet) {
		return <ListItem pet={pet} />;
	}

	render() {
		return (
			<ListView
				style={styles.listContainer}
				enableEmptySections
				dataSource={this.dataSource}
				renderRow={this.renderRow}
			/>
		);
	}
}

const styles = {
	listContainer: {
		margin: 10,
		padding: 5
	}
}

const mapStateToProps = state => {
	// Convert list of pets from an object to an array
	const pets = _.map(state.pets, (val, uid) => {
		return { ...val, uid }; // { name: 'S', id: 'i12li3' };
	});

	return { pets };
};

export default connect(mapStateToProps, { petsFetch })(HouseholdScreen);
