
## 克隆项目

```base
git clone https://github.com/happyZxk/chat-app-server.git
```
## 安装依赖

```bash
$ pnpm install
```

## 运行项目

```bash
# development
$ pnpm  start

# watch mode
$ pnpm  start:dev

# production mode
$ pnpm  start:prod
```

## 项目测试命令

```bash
# unit tests
$ pnpm  test

# e2e tests
$ pnpm  test:e2e

# test coverage
$ pnpm  test:cov
```
## 项目调试

下面是使用 Markdown 格式详细说明如何在 VS Code 中调试 NestJS 项目：

NestJS 项目调试指南
1. 配置 launch.json
在 VS Code 中，你需要创建一个调试配置文件 launch.json。按照以下步骤操作：

2. 打开 VS Code 并打开你的项目。
点击左侧活动栏中的“Run and Debug”图标（或使用快捷键 Ctrl+Shift+D）。
3. 点击顶部的“创建launch.json文件”链接。选择“Node.js”环境。将生成的 launch.json 文件修改为以下内容：
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "NestJS: Debug",
      "args": ["${workspaceFolder}/src/main.ts"],
      "runtimeArgs": ["-r", "ts-node/register", "-r","tsconfig-paths/register"],
      "sourceMaps": true,
      "env": {
        "TS_NODE_PROJECT": "${workspaceFolder}/tsconfig.json"
      },
      "cwd": "${workspaceFolder}",
      "protocol": "inspector",
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    }
  ]
}

```
4. 设置断点
打开你想要调试的 TypeScript 文件。
在代码行号旁边点击以设置断点。

5. 启动调试
在“Run and Debug”面板中选择“NestJS: Debug”配置。
点击绿色的“启动调试”按钮（或者按 F5）。

6. 监控和调试
当代码执行到断点时，VS Code 会暂停执行，并在调试面板中显示当前的变量和调用堆栈。
你可以使用调试工具栏中的按钮来单步执行代码（Step Over、Step Into、Step Out）。