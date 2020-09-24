import React, {useContext} from 'react'
import {Switch, Route} from 'react-router-dom'
import {Redirect} from "react-router"

import UsersPage from '../pages/users-page/users-page'
import HomePage from '../pages/home-page/home-page'
import CollectionsPage from "../pages/collections-page"
import ItemsPage from "../pages/items-page"
import AuthModal from "../components/modals/auth-modal"
import {AuthContext} from "../context/AuthContext"
import ItemPage from "../pages/item-page"

const Routes = ({isAuthenticated, userIsAdmin}) => {

    const {openModal} = useContext(AuthContext)

    return (
        <>
            {!isAuthenticated && openModal && <AuthModal/>}
            <Switch>
                <Route path="/home" exact
                       render={({location: {search}}) => (<HomePage options={search}/>)}/>

                <Route path="/items/:id" exact
                       render={({match}) => (<ItemPage itemId={match.params.id}/>)}/>

                {isAuthenticated && userIsAdmin &&
                    <Route path="/users" exact component={UsersPage}/>
                }

                {isAuthenticated && userIsAdmin &&
                    <Route path="/users/:id" exact render={({match}) => (
                        <CollectionsPage userId={(match.params.id)}/>)}/>
                }

                {isAuthenticated &&
                    <Route path="/collections" exact component={CollectionsPage}/>
                }

                {isAuthenticated &&
                    <Route path="/collections/:id" exact
                           render={({match}) => (<ItemsPage collectionId={match.params.id}/>)}/>
                }

                <Redirect to="/home"/>
            </Switch>
        </>
    )
}

export default Routes