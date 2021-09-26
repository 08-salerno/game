import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import TopicPage from './pages/topic-page/TopicPage';
import ForumRoutes from './routes';
import TopicCreatePage from './pages/topic-create-page/TopicCreatePage';
import TopicListPage from './pages/topic-list-page/TopicListPage';

const Forum: React.FC = () => {
  const { path } = useRouteMatch();

  return (
    <div>
      <div>Forum</div>
      <Switch>
        <Route exact path={path}>
          <TopicListPage />
        </Route>
        <Route path={`${path}${ForumRoutes.TOPIC_CREATE}`}>
          <TopicCreatePage />
        </Route>
        <Route path={`${path}${ForumRoutes.TOPIC_ID}`}>
          <TopicPage />
        </Route>
      </Switch>
    </div>
  );
};

export default Forum;
