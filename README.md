Table of Content
- [Assumptions](#assumptions)
- [Requirements](#requirements)
- [Folder Structure](#folder-structure)
- [Start project with docker](#start-project-with-docker)
- [Start project - development](#start-project---development)
- [TODO List](#todo-list)


# Assumptions
- The duty list items sort by create date
- Only one duty list for all users
- No auth required for all actions on duty list

# Requirements
npm - v10.2.4

nodejs - v21.6.2

docker - v20.10.23

docker-compose - v2.15.1

# Folder Structure
Frontend: /duty-list

Backend: /api

# Start project with docker
```
docker-compose up -d
```

The web can be accessed through http://localhost:8080

# Start project - development
Frontend:
```
  cd duty-list
  npm install
  npm run dev
```

Backend:
```
  cd api
  npm install
  npm run dev
```

# TODO List
- Test on frontend
- UI Style for web
- Update swagger file: [api/duty-list.yaml](api/duty-list.yaml)
