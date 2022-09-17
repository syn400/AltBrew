import { Signin } from '../signin/signin';
import { RecipeList } from '../recipe-list/recipe-list';
// import '../homepage/homepage.scss';

export const RecipeListPage = () => {
    return (
        <>
            <Signin page='recipe-list'/>
            <RecipeList/>
        </>
    )
  }