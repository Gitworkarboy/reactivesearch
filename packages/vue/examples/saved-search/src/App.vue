<template>
	<div id="app">
		<reactive-base
			app="good-books-ds"
			url="https://a03a1cb71321:75b6603d-9456-4a5a-af6b-a487b309eb61@appbase-demo-ansible-abxiydt-arc.searchbase.io"
			><div class="row">
				<div class="col">
					<state-provider>
						<template #default="{ setSearchState }">
							<button @click="() => setSearchState(savedState)">Replay Search</button>
						</template>
					</state-provider>
					<div>
						<multi-list
							componentId="Authors"
							dataField="authors.keyword"
							className="multi-list-container"
							:showCount="true"
							:URLParams="true"
						/>
					</div>
					<single-range
						componentId="Ratings"
						dataField="average_rating"
						:data="[
							{ start: 0, end: 3, label: 'Rating < 3' },
							{ start: 3, end: 4, label: 'Rating 3 to 4' },
							{ start: 4, end: 5, label: 'Rating > 4' },
						]"
						title="Filter Ratings"
						class="ratings-container"
						:URLParams="true"
					/>
				</div>
				<div class="col">
					<reactive-list
						componentId="SearchResult"
						dataField="original_title.keyword"
						className="result-list-container"
						:pagination="true"
						:from="0"
						:size="5"
						:react="{ and: ['Ratings', 'Authors'] }"
						:URLParams="true"
					>
						<template #renderItem="{ item }">
							<div :id="item._id" class="flex book-content" :key="item._id">
								<img :src="item.image" alt="Book Cover" class="book-image" />
								<div class="flex column justify-center ml20">
									<div class="book-header">{{ item.original_title }}</div>
									<div class="flex column justify-space-between">
										<div>
											<div>
												by <span class="authors-list">{{ item.authors }}</span>
											</div>
											<div class="ratings-list flex align-center">
												<span class="stars">
													<i
														v-for="(item, index) in Array(
															item.average_rating_rounded,
														).fill('x')"
														class="fas fa-star"
														:key="index"
													/>
												</span>
												<span class="avg-rating"
													>({{ item.average_rating }} avg)</span
												>
											</div>
										</div>
										<span class="pub-year"
											>Pub {{ item.original_publication_year }}</span
										>
									</div>
								</div>
							</div>
						</template>
					</reactive-list>
				</div>
			</div>
		</reactive-base>
	</div>
</template>

<script>
import {
	StateProvider,
	ReactiveBase,
	ReactiveList,
	SingleRange,
	MultiList,
} from '@appbaseio/reactivesearch-vue';
import './styles.css';

export default {
	name: 'app',
	components: {
		ReactiveBase,
		StateProvider,
		ReactiveList,
		SingleRange,
		MultiList,
	},
	data() {
		return {
			savedState: {
				Authors: ['Meg Cabot', 'King Dean'],
				Ratings: { start: 4, label: 'Rating > 4' },
			},
		};
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
