#!/bin/bash

# MongoDB Development Environment Management Script

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

MONGODB_DIR="/workspaces/todo-list/mongodb-dev"

echo -e "${GREEN}🗄️ MongoDB Development Environment Manager${NC}"
echo "=============================================="

function show_status() {
    echo -e "${YELLOW}📊 Container Status:${NC}"
    cd $MONGODB_DIR && docker-compose ps
    echo ""
}

function start_mongodb() {
    echo -e "${GREEN}🚀 Starting MongoDB...${NC}"
    cd $MONGODB_DIR && docker-compose up -d
    echo -e "${GREEN}✅ MongoDB started!${NC}"
    show_connection_info
}

function stop_mongodb() {
    echo -e "${YELLOW}⏹️ Stopping MongoDB...${NC}"
    cd $MONGODB_DIR && docker-compose down
    echo -e "${GREEN}✅ MongoDB stopped!${NC}"
}

function restart_mongodb() {
    echo -e "${YELLOW}🔄 Restarting MongoDB...${NC}"
    cd $MONGODB_DIR && docker-compose down && docker-compose up -d
    echo -e "${GREEN}✅ MongoDB restarted!${NC}"
    show_connection_info
}

function reset_data() {
    echo -e "${RED}⚠️ This will DELETE ALL DATA! Continue? (y/N)${NC}"
    read -r response
    if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
        echo -e "${RED}🗑️ Resetting all data...${NC}"
        cd $MONGODB_DIR && docker-compose down -v && docker-compose up -d
        echo -e "${GREEN}✅ Data reset complete!${NC}"
        show_connection_info
    else
        echo -e "${YELLOW}❌ Reset cancelled${NC}"
    fi
}

function show_logs() {
    echo -e "${YELLOW}📋 MongoDB Logs (Ctrl+C to exit):${NC}"
    cd $MONGODB_DIR && docker-compose logs -f mongodb
}

function show_connection_info() {
    echo ""
    echo -e "${GREEN}🔗 Connection Information:${NC}"
    echo "================================"
    echo -e "${YELLOW}Backend (.env):${NC}"
    echo "DATABASE_URL=mongodb://todoapp:todopassword123@localhost:27017/todolist"
    echo ""
    echo -e "${YELLOW}Admin Access:${NC}"
    echo "mongodb://admin:adminpassword123@localhost:27017/?authSource=admin"
    echo ""
    echo -e "${YELLOW}MongoDB Shell (Admin):${NC}"
    echo "docker exec -it todo-mongodb-dev mongosh -u admin -p adminpassword123 --authenticationDatabase admin"
    echo ""
    echo -e "${YELLOW}MongoDB Shell (App):${NC}"
    echo "docker exec -it todo-mongodb-dev mongosh -u todoapp -p todopassword123 --authenticationDatabase todolist"
    echo ""
}

function show_help() {
    echo "Usage: $0 [command]"
    echo ""
    echo "Commands:"
    echo "  start     - Start MongoDB container"
    echo "  stop      - Stop MongoDB container"
    echo "  restart   - Restart MongoDB container"
    echo "  status    - Show container status"
    echo "  logs      - Show MongoDB logs"
    echo "  reset     - Reset all data (WARNING: destructive)"
    echo "  connect   - Show connection information"
    echo "  help      - Show this help message"
    echo ""
}

case "$1" in
    start)
        start_mongodb
        ;;
    stop)
        stop_mongodb
        ;;
    restart)
        restart_mongodb
        ;;
    status)
        show_status
        ;;
    logs)
        show_logs
        ;;
    reset)
        reset_data
        ;;
    connect)
        show_connection_info
        ;;
    help|--help|-h)
        show_help
        ;;
    *)
        echo -e "${YELLOW}Available commands:${NC}"
        echo "1. start    - Start MongoDB"
        echo "2. stop     - Stop MongoDB"
        echo "3. restart  - Restart MongoDB"
        echo "4. status   - Show status"
        echo "5. logs     - Show logs"
        echo "6. reset    - Reset data"
        echo "7. connect  - Connection info"
        echo "8. help     - Show help"
        echo ""
        echo -e "${YELLOW}Usage: $0 [command]${NC}"
        ;;
esac
