tmux new-session -d -s edeck

tmux rename-window "docker"
tmux move-window -s edeck:1 -t edeck:9
tmux send-keys "cd server; docker-compose up" Enter

tmux new-window -t 1 -c "-/server"
tmux rename-window -t edeck:1 "editor"

tmux new-window -t 2 -c "-/server"
tmux rename-window -t edeck:2 "bash"

tmux new-window -t 3 -c "-/client"
tmux rename-window -t edeck:3 "js-editor"

tmux new-window -t 4 -c "-/client"
tmux rename-window -t edeck:4 "js-bash"
