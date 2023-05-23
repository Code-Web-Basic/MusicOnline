import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { publicRoutes, publisherRoutes, adminRoutes } from '~/routes';
import DefaultLayoutPublic from '~/layout/Publish';
import { useSelector } from 'react-redux';

function App() {
    const currentUser = useSelector((state) => state.auth.currentUser);
    let routerCheck = null;
    let role = null;
    if (currentUser?.role) {
        role = currentUser?.role[0]?.role;
    }

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

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        } else {
                            Layout = DefaultLayoutPublic;
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
