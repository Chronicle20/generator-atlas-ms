const Generator = require('yeoman-generator');
const {
  execSync
} = require('child_process');

module.exports = class extends Generator {
  async prompting() {
    this.answers = await this.prompt([{
        type: 'input',
        name: 'resourceName',
        message: 'Your resource name'
      },
      {
        type: 'input',
        name: 'resourceAcronym',
        message: 'The resource acronym used for api routing'
      },
      {
        type: 'input',
        name: 'packageName',
        message: 'Package name',
        default: 'main'
      }
    ]);
  }

  writing() {
    const {
      resourceName,
      resourceAcronym,
      packageName
    } = this.answers;

    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'), {
        resourceName,
        resourceAcronym,
        packageName
      }
    );

    this.fs.copyTpl(
      this.templatePath('.gitignore'),
      this.destinationPath('.gitignore'), {
        resourceName,
        resourceAcronym,
        packageName
      }
    );

    this.fs.copyTpl(
      this.templatePath('Dockerfile.dev'),
      this.destinationPath('Dockerfile.dev'), {
        resourceName,
        resourceAcronym,
        packageName
      }
    );

    this.fs.copyTpl(
      this.templatePath('Dockerfile'),
      this.destinationPath('Dockerfile'), {
        resourceName,
        resourceAcronym,
        packageName
      }
    );

    this.fs.copyTpl(
      this.templatePath('Dockerfile.debug'),
      this.destinationPath('Dockerfile.debug'), {
        resourceName,
        resourceAcronym,
        packageName
      }
    );

    this.fs.copyTpl(
      this.templatePath('docker-build.bat'),
      this.destinationPath('docker-build.bat'), {
        resourceName,
        resourceAcronym,
        packageName
      }
    );

    this.fs.copyTpl(
      this.templatePath('docker-build.sh'),
      this.destinationPath('docker-build.sh'), {
        resourceName,
        resourceAcronym,
        packageName
      }
    );

    this.fs.copyTpl(
      this.templatePath('dependabot.yml'),
      this.destinationPath('.github/dependabot.yml'), {
        resourceName,
        resourceAcronym,
        packageName
      }
    );

    this.fs.copyTpl(
      this.templatePath('pull-request.yml'),
      this.destinationPath('.github/workflows/pull-request.yml'), {
        resourceName,
        resourceAcronym,
        packageName
      }
    );

    this.fs.copyTpl(
      this.templatePath('main-snapshot.yml'),
      this.destinationPath('.github/workflows/main-snapshot.yml'), {
        resourceName,
        resourceAcronym,
        packageName
      }
    );

    this.fs.copyTpl(
      this.templatePath('main.go'),
      this.destinationPath('atlas.com/' + resourceName + '/main.go'), {
        resourceName,
        resourceAcronym,
        packageName
      }
    );

    this.fs.copyTpl(
      this.templatePath('go.mod'),
      this.destinationPath('atlas.com/' + resourceName + '/go.mod'), {
        resourceName,
        resourceAcronym,
        packageName
      }
    );

    this.fs.copyTpl(
      this.templatePath('logger/init.go'),
      this.destinationPath('atlas.com/' + resourceName + '/logger/init.go'), {
        resourceName,
        resourceAcronym,
        packageName
      }
    );

    this.fs.copyTpl(
      this.templatePath('tracing/tracing.go'),
      this.destinationPath('atlas.com/' + resourceName + '/tracing/tracing.go'), {
        resourceName,
        resourceAcronym,
        packageName
      }
    );

    this.fs.copyTpl(
      this.templatePath('service/teardown.go'),
      this.destinationPath('atlas.com/' + resourceName + '/service/teardown.go'), {
        resourceName,
        resourceAcronym,
        packageName
      }
    );

    this.fs.copyTpl(
      this.templatePath('renovate.json'),
      this.destinationPath('renovate.json'), {
        resourceName,
        resourceAcronym,
        packageName
      }
    );
  }

  end() {
    const {
      resourceName
    } = this.answers;
    this.log('Running go mod tidy...');

    // Change to the newly created project directory
    const projectPath = this.destinationPath('atlas.com/' + resourceName);

    try {
      // Run the `go mod tidy` command
      execSync('go mod tidy', {
        cwd: projectPath,
        stdio: 'inherit'
      });
      this.log('Go modules updated successfully.');
    } catch (error) {
      this.log('Error running go mod tidy:', error.message);
    }
  }
};
