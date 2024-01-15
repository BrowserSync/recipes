" vim-live-server.vim

" A live web server for Vim
" By Wolandark
" https://github.com/wolandark/vim-live-server

function! StartBrowserSync()
    let cmd = "browser-sync start --no-notify --server --cwd=" . getcwd() . " --files \"*.html, *.css, *.js\" &"
    call system(cmd)
    echo "BrowserSync started in the background."
endfunction

function! StartBrowserSyncOnPort(port)
    let port_num = a:port + 0  " Convert a:port to a number
    let cmd = "browser-sync start --no-notify --server --cwd=" . getcwd() . " --port=" . port_num . " --files \"*.html, *.css, *.js\" &"
    call system(cmd)
    echo "BrowserSync started in the background on port " . port_num . "."
endfunction

function! KillBrowserSync()
    let port = systemlist("pgrep -f 'browser-sync'")[0]
    if empty(port)
        echo "No BrowserSync server found on port 3000."
    else
        let cmd = "kill " . port
        call system(cmd)
        echo "BrowserSync server on port 3000 terminated."
    endif
endfunction

function! KillBrowserSyncOnPort(port)
    let cmd = "pgrep -f 'browser-sync.*--port=" . a:port . "' | xargs -r kill"
    call system(cmd)
    echo "BrowserSync server on port " . a:port . " terminated."
endfunction

function! KillAllBrowserSyncInstances()
    let cmd = "pkill -f 'browser-sync'"
    call system(cmd)
endfunction

augroup BrowserSyncKill
    autocmd!
    autocmd VimLeave * call KillAllBrowserSyncInstances()
augroup END

command! StartBrowserSync call StartBrowserSync()
command! -nargs=1 StartBrowserSyncOnPort call StartBrowserSyncOnPort(<f-args>)
command! KillBrowserSync call KillBrowserSync()
command! -nargs=1 KillBrowserSyncOnPort call KillBrowserSyncOnPort(<f-args>)
