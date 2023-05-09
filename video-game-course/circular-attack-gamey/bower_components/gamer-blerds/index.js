(function (window, _) {
  window.gamerBlerds = window.gamerBlerds || {

    numz: {},

    /**
     * 
     * @param {Object} pointA a point on the screen
     * @param {Object} pointB a secondary point on the screen
     * @param {Number} pointA.x the first point's x value
     * @param {Number} pointA.y the first point's y value
     * @param {Number} pointB.x the second point's x value
     * @param {Number} pointB.y the second point's y value
     * @param {Number} radians the calculated distance between the two points in radians
     * @param {Number} distanceX the calculated distance between the two points' X values in pixels
     * @param {Number} distanceY the calculated distance between the two points' Y values in pixels
     * @return {Number} degrees: the calculated distance between the two points in degrees
     * 
     */

    getAngleDegrees(pointA, pointB) {

      const
        distanceX = pointB.x - pointA.x,
        distanceY = pointB.y - pointA.y,
        radians = Math.atan2(distanceY, distanceX),
        degrees = radians * 180 / Math.PI;
      return degrees;

    },

    degreesToRadians(degrees) {
      return degrees * Math.PI / 180;
    },
    radiansToDegrees(radians) {
      return radians * 180 / Math.PI;
    },

    phyz: {

      /**
       * Returns an Object with basic properties utilized in a 
       * 2D physics system. On top of simple physical properties,
       * the body has template methods handleCollision() and update().
       * 
       * @param {String} type: A String, should be unique to your
       * system, representing the type of body.
       * @param {Object} options.
       * @param {Number} options.velocityX: The body's velocity on the x axis.
       * @param {Number} options.velocityY: The body's velocity on the y axis.
       * @param {Number} options.rotationalVelocity: The body's rotational velocity.
       * @param {Number} options.integrity: The body's integrity. 0 means the 
       * body is no longer intact and should explode or break apart, 1 means 
       * the body is fully intact.
       * @param {Number} options.density: The density of the body, can be 
       * used when calculating the force of impact of a collision, which can 
       * then be distributed to affect the kinetic energy of the colliding bodies.
       * @param {Number} options.volatility: The body's volatility, how unstable or
       * explosive it may be. Can be used as a multiplyer when calculating the 
       * force of impact of a collision.
       * @return {Object} The body.
       */
      makeBody: function (type, {
        velocityX = 0,
        velocityY = 0,
        rotationalVelocity = 0,
        integrity = 1,
        density = 1,
        volatility = 0
      } = {}) {
        if (type === undefined) throw new Error('You must provide a valid String for the type parameter!');
        return {
          type: type,
          velocityX: velocityX,
          velocityY: velocityY,
          rotationalVelocity: rotationalVelocity,
          integrity: integrity,
          density: density,
          volatility: volatility,

          /**
           * @param {Number} A number representing the force of the impact.
           * @param {Object} The other body involved in the collision.
           */
          handleCollision(impact, body) {
            // template method //
          },

          /**
           * Can be overridden in the concrete body to provide a custom update()
           * method.
           */
          update(event) {
            // template method //
          }
        };
      },

      /**
       * Returns the distance between two points on the screen
       * 
       * @param {object} pointA a point on the coordinate plane (screen)
       * @param {object} pointB a second point on the coordinate plane (screen)
       * @param {number} distanceX the horizontal distance from the first point to the second point (pointA and pointB)
       * @param {number} distanceY the vertical distance from the first point to the second point (pointA and pointB)
       * @param {number} distance the direct (shortest length) distance from pointA to pointB
       * @returns {distance} the distance in pixels between the two points
       */

      getDistance(pointA, pointB) {
        const
          distanceX = pointB.x - pointA.x,
          distanceY = pointB.y - pointA.y,
          distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        return distance;
      },

      /**
       * Updates the diagonal velocity properties of a body,
       * taking into account the body's current velocity 
       * and applying any forces acting against the body
       * as acceleration on both the x and y axis.
       * 
       * NOTE: This method DOES NOT update the position of 
       * the body, it only updates its velocity.
       * 
       * @param {Object} body: The body must be an Object 
       * with velocityX, velocityY and rotation properties. 
       * @param {Number} forceOnX: The force acting against
       * the body on the x axis.
       * @param {Number} forceOnY: The force acting against
       * the body on the y axis.
       */

      updateVelocity(body, forceOnX, forceOnY) {
        const
          angle = body.rotation * Math.PI / 180,
          accelerationOnX = Math.cos(angle) * forceOnX,
          accelerationOnY = Math.sin(angle) * forceOnY;
        body.velocityX += accelerationOnX;
        body.velocityY += accelerationOnY;
      },

      /**
       * Updates the x and y properties of a body based on its
       * velocityX and velocityY, and, updates the rotation of
       * a body based on its rotationalVelocity.
       *
       * @param {Object} body: The body must be an Object 
       * with x, y, rotation, velocityX, velocityY, and 
       * rotationalVelocity properties.
       */
      updatePosition(body) {
        body.x += body.velocityX;
        body.y += body.velocityY;
        body.rotation += body.rotationalVelocity;
      },
    },
  };
}(window, window._));



