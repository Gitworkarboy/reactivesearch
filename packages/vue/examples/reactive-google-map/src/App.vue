<template>
	<div id="app">
		<reactive-base
			app="earthquakes"
			url="https://a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61@appbase-demo-ansible-abxiydt-arc.searchbase.io"
		>
			<div class="row">
				<div class="col">
					<single-list
						title="Places"
						componentId="places"
						dataField="place.keyword"
						:size="50"
						showSearch
					/>
				</div>

				<div class="col">
					<selected-filters />
					<reactive-google-map
						componentId="map"
						dataField="location"
						:size="50"
						:style="{ height: '90vh', minWidth: '300px' }"
						:react="{ and: 'places' }"
						:defaultZoom="3"
						:showMarkerClusters="false"
						@open-marker-popover="handleOpen"
						@close-marker-popover="handleClose"
					>
						<template #renderItem="{ magnitude }">
							<div
								:style="{
									background: 'dodgerblue',
									color: '#fff',
									paddingLeft: '5px',
									paddingRight: '5px',
									borderRadius: '3px',
									padding: '10px',
								}"
							>
								<i class="fas fa-globe-europe" />
								&nbsp;{{ magnitude }}
							</div>
						</template>
						<template #renderPopover="{ item }">
							<div
								:style="{
									background: 'dodgerblue',
									color: '#fff',
									paddingLeft: '5px',
									paddingRight: '5px',
									borderRadius: '3px',
									padding: '10px',
								}"
							>
								Place: &nbsp;{{ item.place }}
								<div>Year: &nbsp;{{ new Date(item.time).getFullYear() }}</div>
							</div>
						</template>
					</reactive-google-map>
				</div>
			</div>
		</reactive-base>
	</div>
</template>
<script>
import './styles.css';

export default {
	name: 'app',
	methods: {
		handleOpen() {
			console.log('open');
		},
		handleClose() {
			console.log('close');
		},
	},
};
</script>

<style>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
}
</style>
