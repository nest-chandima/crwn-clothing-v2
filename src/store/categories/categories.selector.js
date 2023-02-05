import { createSelector } from "reselect";

const selectCategoriesReducer = (state) => (state.categories);



//Creating a Memoized Selector iorder to memorize same function values without Re-Rendering 
//createSelector ( [inputValue], (outputValue)=>)
const selectCategories = createSelector(
    [selectCategoriesReducer],
    (categoriesSlice) => categoriesSlice.categories
)



export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories) => categories.reduce((acc, category) => {
        const { title, items } = category;
        acc[title.toLowerCase()] = items;
        return acc;
    }, {})
)

export const selectCategoriesisLoading = createSelector(
    [selectCategoriesReducer],
    (categoriesSlice) => categoriesSlice.isLoading
);