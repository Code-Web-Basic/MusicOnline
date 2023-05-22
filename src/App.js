import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { publicRoutes, publisherRoutes, adminRoutes } from '~/routes';
import DefaultLayoutPublic from '~/layout/Publish';
import DefaultLayoutAdmin from '~/layout/Admin';
import DefaultLayoutPublisher from '~/layout/Publisher';
import { useSelector } from 'react-redux';

function App() {
    const currentUser = useSelector((state) => state.auth.currentUser);
    let routerCheck = null;
    const role = 'publisher';
    // routerCheck = publisherRoutes;
    if (role === 'admin') {
        const arrTmp = [...adminRoutes, ...publicRoutes];
        routerCheck = arrTmp;
    } else if (role === 'publisher') {
        const arrTmp = [...publisherRoutes, ...publicRoutes];
        routerCheck = arrTmp;
    } else {
        routerCheck = publicRoutes;
    }

    return (
        <Router>
            <div className="App">
                <Routes>
                    {routerCheck.map((route, index) => {
                        const Page = route.component;
                        let Layout = null;
                        // layout router
                        if (role === 'admin') {
                            Layout = DefaultLayoutAdmin;
                        } else if (role === 'publisher') {
                            Layout = DefaultLayoutPublisher;
                        } else {
                            Layout = DefaultLayoutPublic;
                        }
                        //
                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        } else {
                            if (role === 'admin') {
                                Layout = DefaultLayoutAdmin;
                            } else if (role === 'publisher') {
                                Layout = DefaultLayoutPublisher;
                            } else {
                                Layout = DefaultLayoutPublic;
                            }
                        }
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
