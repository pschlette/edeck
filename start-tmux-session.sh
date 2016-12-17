tmux new-session -d -s edeck

tmux rename-window "sbt"
tmux move-window -s edeck:1 -t edeck:9
tmux send-keys "./sbt" Enter

tmux new-window -t 8
tmux rename-window -t edeck:8 "redis"
tmux send-keys "redis-server" Enter

tmux new-window -t 2
tmux rename-window -t edeck:2 "bash"

tmux new-window -t 1
tmux rename-window -t edeck:1 "editor"
