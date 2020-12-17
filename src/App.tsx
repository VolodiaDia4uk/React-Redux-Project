import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import { Provider } from 'react-redux';

import UsersList from "./containers/UsersListContainer/UsersList";
import SinglePost from "./containers/SinglePostContainer/SinglePost";
import UserPosts from "./containers/UserPostsContainer/UserPosts";
import PageNotFound from "./containers/PageNotFoundContainer/PageNotFound";
import store from './store/store';

const App = () =>{
    return (
        <Provider store={store}>
            <Router>
                <Switch>
                    <Route exact path="/" render={()=><Redirect to='/users'/>}/>
                    <Route path='/users'>
                        <UsersList/>
                    </Route>
                    <Route path="/posts/:id">
                        <UserPosts/>
                    </Route>
                    <Route path="/post/:id">
                        <SinglePost/>
                    </Route>
                    <Route path="*">
                        <PageNotFound />
                    </Route>
                </Switch>
            </Router>
        </Provider>
    );

}

export default App;
