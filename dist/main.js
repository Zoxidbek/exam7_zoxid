"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const helmet_1 = __importDefault(require("helmet"));
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const PORT = process.env.PORT ?? 3000;
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true
    }));
    app.enableCors();
    app.use((0, helmet_1.default)());
    await app.listen(PORT, () => {
        console.log("Server running at: " + PORT);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map