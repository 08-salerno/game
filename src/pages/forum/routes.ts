const enum ForumRoutes {
    HOME = '/forum',
  TOPIC_ID = '/:topicId',
  TOPIC_CREATE = '/create'
}

export type ForumRouteParams = {
    topicId: string
}

export default ForumRoutes;
